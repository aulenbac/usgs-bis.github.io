import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import {Redirect} from '@docusaurus/router';

function Home() {
  return <Redirect to={useBaseUrl('/pipeline_overview')} />;
}

export default Home;
