import './TransactionsPage.css';

import shvaLogo from '../../../assets/shva-logo.png';

import LanguageToggle from '../components/LanguageToggle/LanguageToggle.jsx';
import TransactionForm from '../components/TransactionForm/TransactionForm.jsx';
import HeroIllustration from '../components/HeroIllustration/ HeroIllustration.jsx'
import ApprovedTransactions from '../components/ApprovedTransactions/ApprovedTransactions.jsx';

import useTransactions from '../hooks/useTransactions.js';

function TransactionsPage() {
    const {
        region,
        setRegion,

        hour,
        setHour,
        minute,
        setMinute,

        approvedTransactions,
        lastResult,

        submitTransaction,

        isLoading,
        error,

        language,
        setLanguage,

        t,
    } = useTransactions();

    return (
        <main className="transactions-page">
            <header className="transactions-header">
                <div className="logo">
                    <img
                        src={shvaLogo}
                        alt="Shva Logo"
                        className="logo-image"
                    />
                </div>

                <LanguageToggle
                    language={language}
                    setLanguage={setLanguage}
                    t={t}
                />
            </header>

            <section className="hero-section">
                <div className="hero-left">
                    <TransactionForm
                        t={t}
                        region={region}
                        setRegion={setRegion}
                        hour={hour}
                        setHour={setHour}
                        minute={minute}
                        setMinute={setMinute}
                        onSubmit={submitTransaction}
                        isLoading={isLoading}
                    />

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    {lastResult && (
                        <div
                            className={
                                lastResult.status === 'Approved'
                                    ? 'result-card approved-result'
                                    : 'result-card rejected-result'
                            }
                        >
                            <h3>
                                {lastResult.status === 'Approved'
                                    ? 'Approved ✅'
                                    : 'Rejected ❌'}
                            </h3>

                            <p>
                                {lastResult.region}
                            </p>

                            <span>
                                {new Date(lastResult.localTime)
                                    .toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                            </span>
                        </div>
                    )}
                </div>

                <div className="hero-right">
                    <HeroIllustration t={t} />
                </div>
            </section>

            <ApprovedTransactions
                t={t}
                transactions={approvedTransactions}
            />
        </main>
    );
}

export default TransactionsPage;