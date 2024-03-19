const questMap = {
    "27": "Ice Obby Completions",
    "46": "Catch Fish in Advanced Fishing",
    "34": "Use Tier 4 Potions",
    "38": "Break Comets in Best Area",
    "40": "Make Golden Pets from Best Egg",
    "44": "Break Lucky Blocks in Best Area",
    "21": "Break Breakables in Best Area",
    "39": "Break Mini-Chests in Best Area",
    "7": "Earn Diamonds",
    "37": "Break Coin Jars in Best Area",
    "43": "Break Piñatas in Best Area",
    "42": "Hatch Rare \"??\" Pets",
    "9": "Break Diamond Breakables",
    "41": "Make Rainbow Pets from Best Egg",
    "20": "Hatch Best Eggs",
    "12": "Craft Tier 3 Potions",
    "45": "Find Chests in Advanced Digsite"
}

  function fetchClanPosition() {
    fetch('https://biggamesapi.io/api/clans?page=1&pageSize=50&sort=Points&sortOrder=desc', {
    })
    .then(response => response.json())
    .then(data => {
      const clans = data.data;
      const vlpClanIndex = clans.findIndex(clan => clan.Name === "VLP") + 1;
      document.getElementById('clanRank').innerText = `#${vlpClanIndex}`;
    })
    .catch(error => console.error('Chyba při načítání clan pozice:', error));
  }
  function fetchData() {
    fetch('https://biggamesapi.io/api/clan/VLP')
      .then(response => response.json())
      .then(data => {
        const clanPoints = data.data.Battles.GoalBattleOne.Points;
        document.getElementById('clanPoints').innerText = `${clanPoints}`;
  
        const goals = data.data.Battles.GoalBattleOne.Goals;
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        goals.forEach(goal => {
          const row = `<tr>
            <td>${questMap[goal.Type] || 'Unknown Quest'}</td>
            <td>${goal.Progress}/${goal.Amount}</td>
            <td>${goal.Stars}</td>
          </tr>`;
          tableBody.innerHTML += row;
        });
  
        fetchClanPosition();
        
        const now = new Date();
        const formattedDate = `${now.getDate()}. ${now.getMonth() + 1}. ${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        document.getElementById('lastUpdated').innerText = `${formattedDate}`;
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  function closeWindow() {
    window.api.closeWindow();
  }
  
  fetchData();
  setInterval(fetchData, 60000);
  