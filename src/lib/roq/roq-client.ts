import { BrowserCookieAuth, RoqPlatformClient } from '@roq/client';
import { RequestOptions, RoqBaasSdk } from './roq-baas-sdk';
import { Fetcher, SWRConfiguration } from 'swr';

export type SWRRequestOptions<Result, Error = any> = {
  disabled?: boolean;
  initialData?: Result;
} & SWRConfiguration<Result, Error, Fetcher<Result>>;

export class RoqClient extends RoqBaasSdk {
  roqPlatform: RoqPlatformClient['roqPlatform'];
  signIn: RoqPlatformClient['signIn'];
  signUp: RoqPlatformClient['signUp'];
  signOut: RoqPlatformClient['signOut'];

  constructor(backendHost: string, platformHost: string, baseOptions: RequestOptions = {}) {
    super(backendHost, baseOptions);
    const roqPlatformClient = new RoqPlatformClient({
      host: platformHost,
      auth: new BrowserCookieAuth(),
    });
    this.roqPlatform = roqPlatformClient.roqPlatform;
    this.signIn = roqPlatformClient.signIn.bind(roqPlatformClient);
    this.signUp = roqPlatformClient.signUp.bind(roqPlatformClient);
    this.signOut = roqPlatformClient.signOut.bind(roqPlatformClient);
  }
}
