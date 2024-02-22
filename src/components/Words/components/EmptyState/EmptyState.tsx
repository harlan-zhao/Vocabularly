import './EmptyState.css';
import GitHubButton from 'react-github-btn';

const EmptyState = () => {
  return (
    <div className="welcome-message">
      <span className="title">Welcome to Vocabularly!</span>
      <span className="description">
        Select words on webpages to look up their definitions and save to your
        Vocabularly list
      </span>

      <div className="githubGroup">
        <span>⬇️ ⭐ Star this project on Github😀 ⬇️</span>
        <div className="starOnGithub">
          <GitHubButton
            href="https://github.com/harlan-zhao/Vocabularly"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star harlan-zhao/Vocabularly on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <div className="followOnGithub">
          <GitHubButton
            href="https://github.com/harlan-zhao"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-size="large"
            data-show-count="true"
            aria-label="Follow @harlan-zhao on GitHub"
          >
            Follow @harlan-zhao
          </GitHubButton>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
