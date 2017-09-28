import * as React from 'react';

export class Spacer extends React.PureComponent<{}, {}> {

  public render(): JSX.Element {
    return (
        <div className='app-spacer'>
          &bull;
        </div>
    );
  }
}
