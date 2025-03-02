import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const [creditScore, setCreditScore] = useState(null);
  const [amountOwed, setAmountOwed] = useState('');
  const [newCredit, setNewCredit] = useState('');
  const [paymentHistory, setPaymentHistory] = useState('');
  const [creditHistoryLength, setCreditHistoryLength] = useState('');
  const [creditMix, setCreditMix] = useState('');

  const calculateCreditScore = () => {
    let score = 600;

    if (paymentHistory >= 95) score += 100;
    else if (paymentHistory >= 80) score += 50;
    else if (paymentHistory >= 60) score -= 50;
    else score -= 150;

    if (amountOwed < 10) score += 80;
    else if (amountOwed < 30) score += 40;
    else if (amountOwed < 50) score -= 30;
    else if (amountOwed < 75) score -= 80;
    else score -= 150;

    if (creditHistoryLength > 15) score += 70;
    else if (creditHistoryLength > 8) score += 50;
    else if (creditHistoryLength > 3) score += 20;
    else if (creditHistoryLength > 1) score -= 50;
    else score -= 100;

    if (newCredit === 0) score += 30;
    else if (newCredit <= 2) score += 10;
    else if (newCredit <= 5) score -= 30;
    else score -= 70;

    if (creditMix >= 3) score += 40;
    else if (creditMix === 2) score += 20;
    else if (creditMix === 1) score += 5;
    else score -= 30;

    score = Math.max(350, Math.min(850, score)); // Keep score within valid range
    setCreditScore(score); // Update state
    return score;
  };

  const handleConfirmRegistration = () => {
    const finalScore = calculateCreditScore(); // Ensure the score is calculated
    console.log("Final Credit Score:", finalScore); // Debugging log
    localStorage.setItem("creditScore", finalScore); // Save score to localStorage
    navigate("/dashboard"); // Redirect to dashboard
};

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Financial Questionnaire</h2>

      {/* Input fields for credit factors */}
      <div style={styles.formGroup}>
        <label>Amount Owed (% of credit limit used):</label>
        <input type="number" value={amountOwed} onChange={(e) => setAmountOwed(Number(e.target.value))} />
      </div>

      <div style={styles.formGroup}>
        <label>New Credit (recently opened accounts):</label>
        <input type="number" value={newCredit} onChange={(e) => setNewCredit(Number(e.target.value))} />
      </div>

      <div style={styles.formGroup}>
        <label>Payment History (% on-time payments):</label>
        <input type="number" value={paymentHistory} onChange={(e) => setPaymentHistory(Number(e.target.value))} />
      </div>

      <div style={styles.formGroup}>
        <label>Credit History Length (Years):</label>
        <input type="number" value={creditHistoryLength} onChange={(e) => setCreditHistoryLength(Number(e.target.value))} />
      </div>

      <div style={styles.formGroup}>
        <label>Credit Mix (variety of credit types):</label>
        <input type="number" value={creditMix} onChange={(e) => setCreditMix(Number(e.target.value))} />
      </div>

      {/* Confirm Registration Button */}
      <button onClick={handleConfirmRegistration} style={styles.button}>Confirm Registration</button>
    </div>
  );
};

const styles = {
  container: { maxWidth: "500px", margin: "auto", padding: "20px" },
  heading: { textAlign: "center" },
  formGroup: { marginBottom: "10px" },
  button: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" },
};

export default QuestionnairePage;
