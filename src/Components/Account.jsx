import React from 'react';

function Account({ title, amount, description, showTransactionsButton }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default Account;
