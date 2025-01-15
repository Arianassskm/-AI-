import { useState, useEffect, useCallback } from "react";
import { OCR_CONFIG } from "../config/ocrConfig";
import { resizeAndCompressImage } from "../utils/imageProcessing";
import axios from "axios";

interface OCRResponse {
  code: number;
  msg: string;
  data: {
    text_list: Array<{
      text: string;
      confidence: number;
    }>;
  };
}

interface AsscessTokenResponse {
  refresh_token: string;
  expires_in: number;
  session_key: string;
  access_token: string;
  scope: string;
}

interface Manifest {
  key: string;
  parentKey: string;
  description: string;
}

interface ExtractResponse {
  // 唯一的 log_id，用于问题定位
  log_id: string;
  // 状态码
  error_code: number;
  // 详情
  error_msg: string;
  // 返回的结果列表
  result: {
    // 发送提交请求时返回的taskId
    taskId: string;
  };
}

interface ExtractLabelInfo {
  // 抽取字段名称
  key: string;
  // 抽取字段的父字段
  parentKey: string;
  // 抽取字段的补充说明
  description: string;
}

export interface ExtractResult {
  // 文档ID
  docId: string;
  // 文档名称
  docName: string;
  // 源文件转换为PDF后的文档bos下载链接，status为Success时返回，有效期为30分钟
  pdfUrl: string;
  // 抽取字段和结果信息
  data: {
    // 单个字段抽取结果列表
    singleKey: object;
    // 组合字段抽取结果列表
    comboKey: object;
  };
}

interface TaskResponse {
  // 唯一的log id，用于问题定位
  log_id: string;
  // 错误码
  error_code: number;
  // 错误描述信息
  error_msg: string;
  // 返回的结果列表
  result: {
    // 任务ID
    taskId: string;
    // 任务状态。Pending：排队中；Running：运行中；Success：成功；Failed：失败
    status: string;
    // 任务失败描述信息
    reason: string;
    // 任务创建时间
    createdAt: string;
    // 任务开始时间
    startedAt: string;
    // 任务结束时间
    finishedAt: string;
    // 任务执行时长
    duration: string;
    // 清单字段配置信息，status为Success时返回
    extractLabelInfo: ExtractLabelInfo[];
    // 文档抽取结果列表
    extractResult: ExtractResult[];
  };
}

interface WordsResult {
  // 识别结果字符串
  words: string;
  // 识别结果中每一行的置信度值，包含average：行置信度平均值，variance：行置信度方差，min：行置信度最小值，当 probability=true 时返回该字段
  probability: object;
}

interface ParagraphsResult {
  // 一个段落包含的行序号，当 paragraph=true 时返回该字段
  words_result_idx: any[];
}

interface AccurateResponse {
  // 唯一的log id，用于问题定位
  log_id: string;
  // 图像方向，当 detect_direction=true 时返回该字段。
  // - 1：未定义，
  // - 0：正向，
  // - 1：逆时针90度，
  // - 2：逆时针180度，
  // - 3：逆时针270度
  direction: number;
  // 识别结果数，表示words_result的元素个数
  words_result_num: number;
  // 识别结果数组
  words_result: WordsResult[];
  // 段落检测结果，当 paragraph=true 时返回该字段
  paragraphs_result: ParagraphsResult[];
  // 识别结果数，表示 paragraphs_result的元素个数，当 paragraph=true 时返回该字段
  paragraphs_result_num: number;
  // 传入PDF文件的总页数，当 pdf_file 参数有效时返回该字段
  pdf_file_size: string;
  // 传入OFD文件的总页数，当 ofd_file 参数有效时返回该字段
  ofd_file_size: string;
}

/**
 * 抽取字段配置，每个抽取字段包含key、parentKey、description三个参数：
 * key为抽取字段名称，是必传参数；
 * parentKey为抽取字段的父字段，是非必传参数，不存在时传root或为空；
 * description为抽取字段的补充说明，用于辅助大模型提升抽取效果，是非必传参数，不存在时为空。
 *
 * 以上三个参数支持中英文、数字、下划线、中划线、斜杠、冒号和括号，其中中横线、下划线、斜杠和冒号不能作为开头和结尾。
 * key和parentKey字符数不超过30，description字符数不超过100。
 * key的数量不能超过100。
 */
const MANIFEST: Manifest[] = [
  { parentKey: "", key: "名称", description: "" },
  { parentKey: "", key: "规格", description: "" },
  { parentKey: "", key: "生产企业", description: "" },
  { parentKey: "", key: "有效期", description: "" },
  { parentKey: "", key: "批次", description: "" },
  { parentKey: "", key: "包装", description: "" },
  { parentKey: "", key: "批准文号", description: "" },
  { parentKey: "", key: "储存条件", description: "" },
  { parentKey: "", key: "用法用量", description: "" },
];

/**
 * 获取access_token
 * @returns
 */
export function accessToken() {
  return new Promise<AsscessTokenResponse>((resolve, reject) => {
    axios
      .post(
        `/baidu-api/oauth/2.0/token?grant_type=client_credentials&client_id=${OCR_CONFIG.API_KEY}&client_secret=${OCR_CONFIG.SECRET_KEY}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

/**
 * 文档抽取
 * @param accessToken
 * @param image 文档 base64编码，需去掉编码头（data:image/jpeg;base64, ），支持上传 JPG、JPEG、PNG、BMP、TIF 和 TIFF 格式图片
 * @param imageName 文档名称，当传入file参数时，该字段必传，例如test.docx
 * @returns
 */
export function extractTask(
  accessToken: string,
  image: string,
  imageName: string
) {
  image = image.replace("data:image/jpeg;base64,", "");
  return new Promise<ExtractResponse>((resolve, reject) => {
    axios
      .post(
        `/baidu-api/rest/2.0/brain/online/v1/extract/task?access_token=${accessToken}`,
        {
          file: image,
          fileName: imageName,
          manifest: JSON.stringify(MANIFEST),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

/**
 * 获取结果接口
 * @param accessToken
 * @param taskId 发送提交请求时返回的taskId
 */
function queryTask(accessToken: string, taskId: string) {
  return new Promise<TaskResponse>((resolve, reject) => {
    axios
      .post(
        `/baidu-api/rest/2.0/brain/online/v1/extract/query_task?access_token=${accessToken}`,
        {
          taskId: taskId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

/**
 * 轮询获取结果
 * @param accessToken
 * @param taskId
 * @returns
 */
export function pollingTask(accessToken: string, taskId: string) {
  let attempts = 0;
  return new Promise<ExtractResult[]>((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const ret = await queryTask(accessToken, taskId);
        attempts++;
        if (ret.result.status === "Success") {
          clearInterval(interval);
          resolve(ret.result.extractResult);
        } else if (ret.result.status === "FAILED") {
          clearInterval(interval);
          reject();
        } else if (attempts >= 7) {
          clearInterval(interval);
          reject();
        }
      } catch (e) {
        console.error(e);
        clearInterval(interval);
        reject();
      }
    }, 5000);
  });
}

export const ocrService = {
  /**
   * 执行 OCR 识别
   */
  async recognizeImage(imageData: string | File): Promise<string[]> {
    try {
      // 确保图片数据是正确的格式
      const processedImage = await resizeAndCompressImage(imageData);
      const base64Data = processedImage.dataUrl.split(",")[1];

      if (!base64Data) {
        throw new Error("Invalid image data");
      }

      const response = await fetch(OCR_CONFIG.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ColaKey: OCR_CONFIG.COLA_KEY,
        },
        body: JSON.stringify({
          image: base64Data,
          language_type: "CHN_ENG",
        }),
      });

      if (!response.ok) {
        throw new Error("OCR service request failed");
      }

      const result: OCRResponse = await response.json();

      if (result.code !== 0) {
        throw new Error(result.msg || "OCR recognition failed");
      }

      return result.data.text_list.map((item) => item.text);
    } catch (err) {
      console.error("OCR Error:", err);
      throw err;
    }
  },
};
