import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [timeThreshold, setTimeThreshold] = useState<number>(5);  // In minutes
  const [scoreDifference, setScoreDifference] = useState<number>(7);  // In points

  const handleSaveSettings = () => {
    alert(`Settings saved! Time threshold: ${timeThreshold} mins, Score difference: ${scoreDifference}`);
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>Time Threshold (minutes): </label>
        <input
          type="number"
          value={timeThreshold}
          onChange={(e) => setTimeThreshold(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Score Difference Threshold (points): </label>
        <input
          type="number"
          value={scoreDifference}
          onChange={(e) => setScoreDifference(Number(e.target.value))}
        />
      </div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default Settings;
