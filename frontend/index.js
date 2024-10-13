import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const registerForm = document.getElementById('registerForm');
  const donationForm = document.getElementById('donationForm');
  const upcyclingForm = document.getElementById('upcyclingForm');
  const wearingUsedForm = document.getElementById('wearingUsedForm');
  const donationList = document.getElementById('donationList');
  const upcyclingList = document.getElementById('upcyclingList');
  const rewardsList = document.getElementById('rewardsList');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamId = document.getElementById('teamId').value;
    const teamName = document.getElementById('teamName').value;
    await backend.registerTeam(teamId, teamName);
    alert('Team registered successfully!');
    registerForm.reset();
    updateLeaderboards();
  });

  donationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamId = document.getElementById('donationTeamId').value;
    const count = parseInt(document.getElementById('donationCount').value);
    await backend.logDonation(teamId, count);
    alert('Donation logged successfully!');
    donationForm.reset();
    updateLeaderboards();
  });

  upcyclingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamId = document.getElementById('upcyclingTeamId').value;
    const count = parseInt(document.getElementById('upcyclingCount').value);
    await backend.logUpcycled(teamId, count);
    alert('Upcycled jerseys logged successfully!');
    upcyclingForm.reset();
    updateLeaderboards();
  });

  wearingUsedForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamId = document.getElementById('wearingUsedTeamId').value;
    const count = parseInt(document.getElementById('wearingUsedCount').value);
    await backend.logWearingUsedJersey(teamId, count);
    alert('Wearing used jerseys logged successfully!');
    wearingUsedForm.reset();
    updateLeaderboards();
  });

  async function updateLeaderboards() {
    const topDonatingTeams = await backend.getTopDonatingTeams(5);
    const topUpcyclingTeams = await backend.getTopUpcyclingTeams(5);
    const topRewardedTeams = await backend.getTopRewardedTeams(5);

    updateLeaderboard(donationList, topDonatingTeams, 'donatedJerseys');
    updateLeaderboard(upcyclingList, topUpcyclingTeams, 'upcycledJerseys');
    updateLeaderboard(rewardsList, topRewardedTeams, 'rewardPoints');
  }

  function updateLeaderboard(listElement, teams, jerseyType) {
    listElement.innerHTML = '';
    teams.forEach(([id, team]) => {
      const li = document.createElement('li');
      li.textContent = `${team.name} (${id}): ${team[jerseyType]} ${jerseyType === 'rewardPoints' ? 'points' : 'jerseys'}`;
      listElement.appendChild(li);
    });
  }

  // Initial leaderboard update
  updateLeaderboards();
});
