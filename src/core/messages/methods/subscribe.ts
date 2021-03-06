import { Subscription } from "../../subscription";
import { IncomingRequest } from "../incoming-request";
import { IncomingResponse } from "../incoming-response";
import { OutgoingRequest, OutgoingRequestDelegate } from "../outgoing-request";
import { IncomingNotifyRequest } from "./notify";

// tslint:disable:no-empty-interface

export interface IncomingSubscribeRequest extends IncomingRequest {
}

export interface IncomingSubscribeResponse extends IncomingResponse {
}

/** SUBSCRIBE message sent from local client to remote server. */
export interface OutgoingSubscribeRequest extends OutgoingRequest {
  /** Delegate providing custom handling of this outgoing SUBSCRIBE request. */
  delegate?: OutgoingSubscribeRequestDelegate;
  /** Stop waiting for an inital subscription creating NOTIFY. */
  waitNotifyStop(): void;
}

/** Delegate providing custom handling of outgoing SUBSCRIBE requests. */
export interface OutgoingSubscribeRequestDelegate extends OutgoingRequestDelegate {
  /**
   * Received the initial subscription creating NOTIFY in response to this request.
   * Called for out of dialog SUBSCRIBE requests only (not called for re-SUBSCRIBE requests).
   * @param request Incoming NOTIFY request (including a Subscription).
   */
  onNotify?(request: IncomingRequestWithSubscription): void;

  /**
   * Timed out waiting to receive the initial subscription creating NOTIFY in response to this request.
   * Called for out of dialog SUBSCRIBE requests only (not called for re-SUBSCRIBE requests).
   */
  onNotifyTimeout?(): void;
}

export interface IncomingRequestWithSubscription {
  /** The NOTIFY request which established the subscription. */
  readonly request: IncomingNotifyRequest;
  /** If subscription state is not "terminated", then the subscription. Otherwise undefined. */
  readonly subscription?: Subscription;
}
