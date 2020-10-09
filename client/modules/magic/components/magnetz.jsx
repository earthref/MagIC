import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

export default () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch('https://api.github.com/repos/earthref/MagIC-MagNetZ/contents/magnetz.md');
      if (!resp.ok) {
        setData(false);
      } else {
        const json = await resp.json();
        const b64 = json.content;
        setData(decodeURIComponent(escape(atob(b64))));
      }
    }
    fetchData();
  }, []);

  return (<div>
    { data === null &&
      <div className="ui segment" style={{minHeight: "8em"}}>
        <div className="ui inverted active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      </div>
    }
    { data === false &&
      <div className="ui error huge message" style={{textAlign: "center"}}>
        Error Loading Content!
      </div>
    }
    { data &&
      <Markdown>{data}</Markdown>
    }
  </div>);
}