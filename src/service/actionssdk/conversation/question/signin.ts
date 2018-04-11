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

import * as Api from '../../api/v2'
import { SoloQuestion } from './question'

/** @public */
export type SignInArgument = Api.GoogleActionsV2SignInValue

/**
 * Hands the user off to a web sign in flow. App sign in and OAuth credentials
 * are set in the {@link https://console.actions.google.com|Actions Console}.
 * Retrieve the access token in subsequent intents using
 * {@link Access#token|conv.user.access.token}.
 *
 * @example
 * // Actions SDK
 * const app = actionssdk()
 *
 * app.intent('actions.intent.MAIN', conv => {
 *   conv.ask(new SignIn())
 * })
 *
 * app.intent('actions.intent.SIGN_IN', (conv, input, signin) => {
 *   if (signin.status === 'OK') {
 *     const access = conv.user.access.token // possibly do something with access token
 *     conv.ask('Great, thanks for signing in!')
 *   } else {
 *     conv.ask(`I won't be able to save your data, but let's continue!`)
 *   }
 * })
 *
 * // Dialogflow
 * const app = dialogflow()
 *
 * app.intent('actions.intent.MAIN', conv => {
 *   conv.ask(new SignIn())
 * })
 *
 * // Create a Dialogflow intent with the `actions_intent_SIGN_IN` event
 * app.intent('Get Signin', (conv, params, signin) => {
 *   if (signin.status === 'OK') {
 *     const access = conv.user.access.token // possibly do something with access token
 *     conv.ask('Great, thanks for signing in!')
 *   } else {
 *     conv.ask(`I won't be able to save your data, but let's continue!`)
 *   }
 * })
 *
 * @public
 */
export class SignIn extends SoloQuestion<
  'actions.intent.SIGN_IN',
  Api.GoogleActionsV2SignInValueSpec
> {
  /** @public */
  constructor() {
    super('actions.intent.SIGN_IN')

    this._data('type.googleapis.com/google.actions.v2.SignInValueSpec')
  }
}
