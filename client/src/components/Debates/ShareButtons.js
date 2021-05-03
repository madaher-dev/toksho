import React from 'react';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';

import IconButton from '@material-ui/core/IconButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LinkIcon from '@material-ui/icons/Link';

import Tooltip from '@material-ui/core/Tooltip';

const ShareButtons = ({ debate, setAnchorElRight, handleOpenSnack }) => {
  return (
    <div>
      <div
        style={{
          padding: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Tooltip
          title="Share on Facebook"
          aria-label="fb-share"
          placement="right"
        >
          <FacebookShareButton
            url={window.location.href}
            beforeOnClick={() => setAnchorElRight(null)}
            style={{ padding: 5 }}
            quote={`${debate.title} by ${debate.user.name}`}
            hashtag={`#${debate.topics[0]}`}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </Tooltip>
      </div>
      <div
        style={{
          padding: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Tooltip
          title="Copy Link to Clipboard"
          aria-label="link-share"
          placement="right"
        >
          <div>
            <TwitterShareButton
              url={window.location.href}
              beforeOnClick={() => setAnchorElRight(null)}
              title={`${debate.title} by ${debate.user.name}`}
              via="tokshome"
              hashtags={debate.topics}
              //related={['tokshome', 'toksho']}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </Tooltip>
      </div>
      <div style={{ padding: 5 }}>
        <Tooltip
          title="Copy Link to Clipboard"
          aria-label="link-share"
          placement="right"
        >
          <CopyToClipboard text={window.location.href} onCopy={handleOpenSnack}>
            <IconButton
              aria-label="copy"
              onClick={() => setAnchorElRight(null)}
            >
              <LinkIcon size={32} />
            </IconButton>
          </CopyToClipboard>
        </Tooltip>
      </div>
    </div>
  );
};

export default ShareButtons;
