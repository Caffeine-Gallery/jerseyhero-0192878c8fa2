import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Team {
  'upcycledJerseys' : bigint,
  'name' : string,
  'rewardPoints' : bigint,
  'donatedJerseys' : bigint,
}
export type TeamId = string;
export interface _SERVICE {
  'getAllTeams' : ActorMethod<[], Array<[TeamId, Team]>>,
  'getTeam' : ActorMethod<[TeamId], [] | [Team]>,
  'getTopDonatingTeams' : ActorMethod<[bigint], Array<[TeamId, Team]>>,
  'getTopRewardedTeams' : ActorMethod<[bigint], Array<[TeamId, Team]>>,
  'getTopUpcyclingTeams' : ActorMethod<[bigint], Array<[TeamId, Team]>>,
  'logDonation' : ActorMethod<[TeamId, bigint], undefined>,
  'logUpcycled' : ActorMethod<[TeamId, bigint], undefined>,
  'logWearingUsedJersey' : ActorMethod<[TeamId, bigint], undefined>,
  'registerTeam' : ActorMethod<[TeamId, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
