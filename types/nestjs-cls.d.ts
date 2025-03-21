/**
 * File: global.d.ts
 * Description: 扩展定义模块内的默认类型
 * Author: zhx47
 */

import 'nestjs-cls';
import { H5stAlgoContextType } from '../src/core';

/**
 * 重新定义默认的上下文对象的类型
 */
declare module 'nestjs-cls' {
  interface ClsStore {
    h5stContext?: H5stAlgoContextType;
  }
}
