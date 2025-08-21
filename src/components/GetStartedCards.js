import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export default function GetStartedCards() {
  return (
    <div className="developer-journey-cards">
      <Link to="#step-1-foundation-setup" className="card card-clickable">
        <div className="card__header">
          <h4>
            <Translate id="getStarted.step1.title">Step 1: Foundation Setup</Translate>
          </h4>
        </div>
        <div className="card__body">
          <p>
            <Translate id="getStarted.step1.description">Get oriented with Kaia networks, tools, and development environment.</Translate>
          </p>
        </div>
      </Link>
      
      <Link to="#step-2-set-up-wallet--network" className="card card-clickable">
        <div className="card__header">
          <h4>
            <Translate id="getStarted.step2.title">Step 2: Set Up Wallet & Network</Translate>
          </h4>
        </div>
        <div className="card__body">
          <p>
            <Translate id="getStarted.step2.description">Configure your wallet for Kaia networks and create an account.</Translate>
          </p>
        </div>
      </Link>
      
      <Link to="#step-3-get-test-kaia" className="card card-clickable">
        <div className="card__header">
          <h4>
            <Translate id="getStarted.step3.title">Step 3: Get Test KAIA</Translate>
          </h4>
        </div>
        <div className="card__body">
          <p>
            <Translate id="getStarted.step3.description">Fund your wallet with testnet KAIA from the faucet.</Translate>
          </p>
        </div>
      </Link>
      
      <Link to="#step-4-hello-world-with-remix" className="card card-clickable">
        <div className="card__header">
          <h4>
            <Translate id="getStarted.step4.title">Step 4: Hello World with Remix</Translate>
          </h4>
        </div>
        <div className="card__body">
          <p>
            <Translate id="getStarted.step4.description">Deploy your first smart contract using Remix IDE.</Translate>
          </p>
        </div>
      </Link>
      
      <Link to="#step-5-create-your-first-token" className="card card-clickable">
        <div className="card__header">
          <h4>
            <Translate id="getStarted.step5.title">Step 5: Create Your First Token</Translate>
          </h4>
        </div>
        <div className="card__body">
          <p>
            <Translate id="getStarted.step5.description">Build and deploy a soulbound token using Hardhat.</Translate>
          </p>
        </div>
      </Link>
      
      <Link to="#step-6-build-your-first-dapp-on-kaia" className="card card-clickable">
        <div className="card__header">
          <h4>
            <Translate id="getStarted.step6.title">Step 6: Build Your First dApp</Translate>
          </h4>
        </div>
        <div className="card__body">
          <p>
            <Translate id="getStarted.step6.description">Create a full-stack decentralized application.</Translate>
          </p>
        </div>
      </Link>
      
      <Link to="#step-7-build-a-mini-dapp" className="card card-clickable">
        <div className="card__header">
          <h4>
            <Translate id="getStarted.step7.title">Step 7: Build a Mini dApp</Translate>
          </h4>
        </div>
        <div className="card__body">
          <p>
            <Translate id="getStarted.step7.description">Integrate Web3 features into platforms like LINE.</Translate>
          </p>
        </div>
      </Link>

      <style jsx>{`
        .developer-journey-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 2rem 0;
          max-width: 600px;
        }

        .developer-journey-cards .card-clickable {
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease-in-out;
        }

        .developer-journey-cards .card-clickable:hover {
          text-decoration: none;
          color: inherit;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-color: var(--ifm-color-primary);
        }

        .developer-journey-cards .card {
          border: 1px solid var(--ifm-color-emphasis-300);
          border-radius: var(--ifm-card-border-radius);
          box-shadow: var(--ifm-global-shadow-lw);
          cursor: pointer;
        }

        .developer-journey-cards .card__header {
          padding: 1rem;
          background-color: var(--ifm-color-emphasis-100);
          border-bottom: 1px solid var(--ifm-color-emphasis-300);
        }

        .developer-journey-cards .card__header h4 {
          margin: 0;
          color: var(--ifm-color-primary);
        }

        .developer-journey-cards .card__body {
          padding: 1rem;
        }

        .developer-journey-cards .card__body p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}