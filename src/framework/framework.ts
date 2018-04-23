/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ExpressHandler, Express, express } from './express'
import { LambdaHandler, Lambda, lambda } from './lambda'
import { JsonObject } from '../common'

export interface Frameworks {
  /** @public */
  [name: string]: Framework<Function>
}

/** @public */
export interface Framework<THandler> {
  /** @public */
  handle(base: StandardHandler): THandler

  /** @public */
  // tslint:disable-next-line:no-any detect if it is the correct framework from any parameter type
  check(...args: any[]): boolean
}

/** @public */
export interface OmniHandler extends StandardHandler, ExpressHandler, LambdaHandler {
  /** @public */
  // tslint:disable-next-line:no-any allow any inputs and outputs depending on framework
  (...args: any[]): any
}

export interface BuiltinFrameworks extends Frameworks {
  /**
   * Plug and play web framework support for express using body-parser
   * @public
   */
  express: Express

  /**
   * Plug and play web framework support for lambda API gateway
   * @public
   */
  lambda: Lambda
}

export const builtin: BuiltinFrameworks = {
  express,
  lambda,
}

/** @public */
export interface StandardResponse {
  /** @public */
  status: number

  /** @public */
  body: JsonObject
}

/** @public */
export interface Headers {
  /** @public */
  [header: string]: string | string[] | undefined
}

/** @public */
export interface StandardHandler {
  /** @public */
  (body: JsonObject, headers: Headers): Promise<StandardResponse>
}
