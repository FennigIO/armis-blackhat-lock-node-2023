const { getDatabase } = require('../../util/db');

exports.getValidCode = async (code) => {
  const db = await getDatabase();
  const [data] = await db.query(
    `SELECT Code, IsActive,
    (SELECT COUNT(*) FROM Tracking WHERE Code = ?) AS "TotalSubmitted" 
    FROM Codes
    WHERE IsActive = 1
    AND Code = ?`,
    [code, code]
  );
  return data;
};

exports.insertTracking = async (code, winner) => {
    const db = await getDatabase();
    const { affectedRows } = await db.query(
      `INSERT INTO Tracking (Code, IsWinner) VALUES (?, ?)`,
      [code, winner]
    );
    if (affectedRows > 0) {
        return true;
    } else {
        return false;
    }
};