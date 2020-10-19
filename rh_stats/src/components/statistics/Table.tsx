import React from "react";
import { Head } from "../misc/html_head";
import Loading from "../misc/loading";

interface TableProps {
  equityHistory: any;
  totalInvested: string;
  cash: string;
}

export function Table(props: TableProps): JSX.Element {
  const { equityHistory, totalInvested, cash } = props;

  if (!equityHistory) {
    return <Loading />;
  }
  return (
    <div>
      <Head />
      <div>
        <div className="top-container">
          <div className="stats-header">
            <div className="stats-box">
              <div className="stats-box-title text">Total Portfolio</div>
              <div className="stats-box-value condensed">
                {utils.beautifyPrice(
                  parseFloat(totalInvested) + parseFloat(cash)
                )}
              </div>
              <div className="stats-box-data-row">
                <div className="data-row-categ text">Realized Return</div>
                {renderTotal(true)}
              </div>
              <div className="stats-box-data-row">
                <div className="data-row-categ text">Unrealized Return</div>
                {renderTotal(false)}
              </div>
              <div className="stats-box-data-row">
                <div className="data-row-categ text">Buying Power</div>
                <div className="data-row-value condensed">
                  {utils.beautifyPrice(cash)}
                </div>
              </div>
              <div className="stats-box-data-row">
                <div className="data-row-categ text">Total Investment</div>
                <div className="data-row-value condensed">
                  {utils.beautifyPrice(totalInvested)}
                </div>
              </div>
            </div>
            <div className="header-btns">
              <div
                className="text stock-redir-btn reload-btn"
                type="button"
                onClick={() => {
                  setEquityHistory(null);
                  setRefresh(refresh + 1);
                }}
              >
                Reload
              </div>
              <div
                className="text stock-redir-btn reload-btn"
                type="button"
                onClick={() => {
                  auth.logout();
                  setLoggedIn(false);
                }}
              >
                Log out
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-container">
          <div className="history-container">
            <div className="history-header updated-stats">
              Updated at {lastUpdatedAt}
            </div>
            <div className="history-header table-title text">History</div>
            <div className="history-categories">
              <div
                className={`history-category-btn ${
                  activeCategory === "equities"
                    ? "active-category"
                    : "inactive-category"
                }`}
                onClick={() => {
                  activateHistoryCategory("equities");
                }}
              >
                Equities
              </div>
              {/* Disable options */}
              {/*<div className={`history-category-btn ${activeCategory === 'options' ? 'active-category' : 'inactive-category'}`}
                                          onClick={() => {
                                              activateHistoryCategory('options');
                                          }}>Options
                                      </div>*/}
            </div>
            {renderTable()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
