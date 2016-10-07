import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import IconButton from '../client/modules/common/components/icon_button.jsx';

storiesOf('Icon Button', module)
  .add('Examples', () => (
    <div>
      <div className="ui three column grid">
        <div className="column">
          <IconButton className="large" portal="EarthRef.org">
            <i className="icons">
              <i className="database icon"></i>
              <i className="corner search icon"></i>
            </i>
            <div className="title">EarthRef</div>
            <div className="subtitle">Large</div>
          </IconButton>
        </div>
        <div className="column">
          <IconButton className="" portal="GERM">
            <i className="icons">
              <i className="database icon"></i>
              <i className="corner search icon"></i>
            </i>
            <div className="title">GERM</div>
            <div className="subtitle">Default</div>
          </IconButton>
        </div>
        <div className="column">
          <IconButton className="small" portal="MagIC">
            <i className="icons">
              <i className="database icon"></i>
              <i className="corner search icon"></i>
            </i>
            <div className="title">MagIC</div>
            <div className="subtitle">Small</div>
          </IconButton>
        </div>
      </div>
      <div className="ui two column grid">
        <div className="column">
          <IconButton className="" portal="EarthRef.org">
            <i className="icons">
              <i className="database icon"></i>
              <i className="corner search icon"></i>
            </i>
            <div className="title">EarthRef</div>
            <div className="subtitle">Default</div>
          </IconButton>
        </div>
        <div className="column">
          <IconButton className="borderless" portal="GERM">
            <i className="icons">
              <i className="database icon"></i>
              <i className="corner search icon"></i>
            </i>
            <div className="title">GERM</div>
            <div className="subtitle">Borderless</div>
          </IconButton>
        </div>
      </div>
      <div className="ui two cards">
        <IconButton className="card" portal="EarthRef.org">
          <i className="icons">
            <i className="database icon"></i>
            <i className="corner search icon"></i>
          </i>
          <div className="title">EarthRef</div>
          <div className="subtitle">Card 1<br/>with<br/>lots<br/>of<br/>sub<br/>titles</div>
        </IconButton>
        <IconButton className="card" portal="GERM">
          <i className="icons">
            <i className="database icon"></i>
            <i className="corner search icon"></i>
          </i>
          <div className="title">GERM</div>
          <div className="subtitle">Card 2 with the same height</div>
        </IconButton>
      </div>
    </div>
  ));