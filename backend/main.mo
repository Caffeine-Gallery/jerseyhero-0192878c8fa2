import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
  // Types
  type TeamId = Text;
  type Team = {
    name: Text;
    donatedJerseys: Nat;
    upcycledJerseys: Nat;
  };

  // State
  stable var teamEntries : [(TeamId, Team)] = [];
  var teams = HashMap.HashMap<TeamId, Team>(0, Text.equal, Text.hash);

  // Initialize teams from stable storage
  system func preupgrade() {
    teamEntries := Iter.toArray(teams.entries());
  };

  system func postupgrade() {
    teams := HashMap.fromIter<TeamId, Team>(teamEntries.vals(), 1, Text.equal, Text.hash);
  };

  // Helper function to get or create a team
  func getOrCreateTeam(id: TeamId, name: Text) : Team {
    switch (teams.get(id)) {
      case null {
        let newTeam = { name = name; donatedJerseys = 0; upcycledJerseys = 0 };
        teams.put(id, newTeam);
        newTeam
      };
      case (?team) team
    }
  };

  // Register a new team or update existing team
  public func registerTeam(id: TeamId, name: Text) : async () {
    let team = getOrCreateTeam(id, name);
    teams.put(id, team);
  };

  // Log donated jerseys
  public func logDonation(id: TeamId, count: Nat) : async () {
    switch (teams.get(id)) {
      case null { /* Team not found, do nothing */ };
      case (?team) {
        let updatedTeam = {
          name = team.name;
          donatedJerseys = team.donatedJerseys + count;
          upcycledJerseys = team.upcycledJerseys;
        };
        teams.put(id, updatedTeam);
      };
    };
  };

  // Log upcycled jerseys
  public func logUpcycled(id: TeamId, count: Nat) : async () {
    switch (teams.get(id)) {
      case null { /* Team not found, do nothing */ };
      case (?team) {
        let updatedTeam = {
          name = team.name;
          donatedJerseys = team.donatedJerseys;
          upcycledJerseys = team.upcycledJerseys + count;
        };
        teams.put(id, updatedTeam);
      };
    };
  };

  // Get team information
  public query func getTeam(id: TeamId) : async ?Team {
    teams.get(id)
  };

  // Get all teams
  public query func getAllTeams() : async [(TeamId, Team)] {
    Iter.toArray(teams.entries())
  };

  // Get top donating teams
  public query func getTopDonatingTeams(limit: Nat) : async [(TeamId, Team)] {
    let sortedTeams = Array.sort<(TeamId, Team)>(
      Iter.toArray(teams.entries()),
      func (a, b) { Nat.compare(b.1.donatedJerseys, a.1.donatedJerseys) }
    );
    Array.subArray(sortedTeams, 0, Nat.min(limit, sortedTeams.size()))
  };

  // Get top upcycling teams
  public query func getTopUpcyclingTeams(limit: Nat) : async [(TeamId, Team)] {
    let sortedTeams = Array.sort<(TeamId, Team)>(
      Iter.toArray(teams.entries()),
      func (a, b) { Nat.compare(b.1.upcycledJerseys, a.1.upcycledJerseys) }
    );
    Array.subArray(sortedTeams, 0, Nat.min(limit, sortedTeams.size()))
  };
}
