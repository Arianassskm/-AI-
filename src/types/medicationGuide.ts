export type GuideType = 
  // 注射类
  | 'insulin_injection'    // 胰岛素注射
  | 'subcutaneous'        // 皮下注射
  | 'intramuscular'       // 肌肉注射
  | 'intravenous'         // 静脉注射
  
  // 吸入类
  | 'inhaler_mdi'         // 定量吸入器
  | 'inhaler_dpi'         // 干粉吸入器
  | 'inhaler_smi'         // 软雾吸入器
  
  // 雾化类
  | 'nebulizer_compressor' // 压缩式雾化器
  | 'nebulizer_ultrasonic' // 超声波雾化器
  | 'nebulizer_mesh'       // 网式雾化器
  
  // 给药途径
  | 'oral_liquid'         // 口服液体
  | 'oral_powder'         // 口服粉剂
  | 'sublingual'          // 舌下含服
  | 'transdermal'         // 透皮贴剂
  | 'suppository'         // 栓剂使用
  | 'eye_drops'           // 滴眼液
  | 'ear_drops'           // 滴耳液
  | 'nasal_spray'         // 鼻腔喷雾
  
  // 医疗器械
  | 'glucose_monitor'     // 血糖监测
  | 'blood_pressure'      // 血压测量
  | 'suction'            // 吸痰器
  | 'oxygen'             // 制氧机
  | 'cpap'               // 呼吸机
  | 'insulin_pump';       // 胰岛素泵

export interface UserContext {
  age?: number;
  experience?: 'none' | 'beginner' | 'experienced';
  physicalLimitations?: {
    vision?: boolean;      // 视力障碍
    hearing?: boolean;     // 听力障碍
    dexterity?: boolean;   // 手部灵活性
    mobility?: boolean;    // 行动能力
  };
  preferences?: {
    language?: string;
    detailLevel?: 'basic' | 'detailed' | 'expert';
    textSize?: 'normal' | 'large';
    audioGuide?: boolean;
    videoPreferred?: boolean;
  };
  medicalConditions?: string[];  // 相关疾病
  allergies?: string[];         // 过敏史
}

// 其他接口保持不变...