/**
 * File: h5st4.9.1.ts
 * Description: h5st4.9.1 算法
 * Author: zhx47
 */

import { ClsService } from 'nestjs-cls';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from 'nestjs-cache-manager-v6';
import { BaseH5st } from './baseH5st';
import { H5stVersion, KVType } from './type';
import { H5stAlgoConfigCollection, H5stInitConfig } from './config';
import { CustomAlgorithm } from '../algorithm';
import { LocalTokenVersion } from '../token';
import { TokenFactory } from '../token.factory';

@Injectable()
export class Xcx491 extends BaseH5st {
  protected readonly logger = new Logger(Xcx491.name);
  constructor(
    protected readonly clsService: ClsService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    protected readonly tokenFactory: TokenFactory,
    protected readonly algos: CustomAlgorithm,
  ) {
    super(clsService, cacheManager, tokenFactory.getInstance(LocalTokenVersion['04']), algos);
  }

  init(h5stInitConfig: H5stInitConfig) {
    super.init(h5stInitConfig, H5stAlgoConfigCollection[H5stVersion['xcx4.9.1']]);
  }

  __genSign(key: string, body: KVType[]): string {
    const paramsStr = super.__genSign(key, body);
    const signedStr = this.algos.MD5(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    this._log(`__genSign, paramsStr:${paramsStr}, signedStr:${signedStr}`);
    return signedStr;
  }

  __genSignDefault(key: string, body: KVType[]): string {
    const paramsStr = super.__genSignDefault(key, body);
    const signedStr = this.algos.MD5(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    this._log(`__genSignDefault, paramsStr:${paramsStr}, signedStr:${signedStr}`);
    return signedStr;
  }
}
