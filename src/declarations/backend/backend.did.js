export const idlFactory = ({ IDL }) => {
  const TeamId = IDL.Text;
  const Team = IDL.Record({
    'upcycledJerseys' : IDL.Nat,
    'name' : IDL.Text,
    'rewardPoints' : IDL.Nat,
    'donatedJerseys' : IDL.Nat,
  });
  return IDL.Service({
    'getAllTeams' : IDL.Func([], [IDL.Vec(IDL.Tuple(TeamId, Team))], ['query']),
    'getTeam' : IDL.Func([TeamId], [IDL.Opt(Team)], ['query']),
    'getTopDonatingTeams' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(TeamId, Team))],
        ['query'],
      ),
    'getTopRewardedTeams' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(TeamId, Team))],
        ['query'],
      ),
    'getTopUpcyclingTeams' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(TeamId, Team))],
        ['query'],
      ),
    'logDonation' : IDL.Func([TeamId, IDL.Nat], [], []),
    'logUpcycled' : IDL.Func([TeamId, IDL.Nat], [], []),
    'logWearingUsedJersey' : IDL.Func([TeamId, IDL.Nat], [], []),
    'registerTeam' : IDL.Func([TeamId, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
