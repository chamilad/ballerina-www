import React, { Component } from 'react';
import {
  Container, Segment, Grid, Header, Icon
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import CodeEditor from './components/editor/CodeEditor';
import SamplesList from './components/navigation/SamplesList'
import './BallerinaWidget.scss';
import { fetchSamples, fetchSample } from './samples/provider'
import CURLEditor from './components/curl/CURLEditor';
import Console from './components/console/Console'
import ViewSelectPanel, { VIEWS } from './components/controls/ViewSelectPanel';
import RunButton from './components/controls/RunButton';
import ShareButton from './components/controls/ShareButton';
import PopOutButton from './components/controls/PopOutButton';
import DesignView from './components/design-view/DesignView';
import DownloadsView from './components/downloads-view/DownloadsView';
import { getMonospaceFontFamily } from './client-utils';
class BallerinaWidget extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      samples: [],
      selectedSampleIndex: 0,
      selectedView: VIEWS.SOURCE,
      curlVisible: true,
      isReadyToRun: false
    }
    this.consoleRef = undefined;
    this.onSampleSelect = this.onSampleSelect.bind(this);
    this.onCurrentSampleContentChange = this.onCurrentSampleContentChange.bind(this);
  }

  componentDidMount() {
    fetchSamples()
      .then((samples) => {
        this.setState({ 
          samples
        });
        this.onSampleSelect(0);
      })
  }

  onSampleSelect(selectedSampleIndex) {
    this.setState({
      isReadyToRun: false
    });
    const sample = this.state.samples[selectedSampleIndex];
    if (sample.content) {
      this.setState({
        selectedSampleIndex,
        selectedView: VIEWS.SOURCE,
        isReadyToRun: true
      });
    } else {
      const { file, image } = sample;
      fetchSample(file)
        .then((data) => {
           sample.content = data;
           this.setState({
              selectedSampleIndex,
              selectedView: VIEWS.SOURCE,
              isReadyToRun: true
            });
        })
    }
    this.consoleRef.clear();
  }

  onCurrentSampleContentChange(newContent) {
    const sample = this.state.samples[this.state.selectedSampleIndex];
    sample.content = newContent;
    this.forceUpdate();
  }

  render() {
    const { samples, selectedSampleIndex, selectedView, isReadyToRun } = this.state;
    const sample = samples && (samples.length > 0) 
                        && (selectedSampleIndex >= 0)
                        && (samples.length - 1 >= selectedSampleIndex)
                    ? samples[selectedSampleIndex]
                    : undefined;
    const consoleHeight = this.state.curlVisible ? 140 : 168;
    return (
    <Container className="ballerina-playground ballerina-editor">
      {sample &&
      <div className="playground-widget">
        <Segment.Group className="header">
          <Segment
            className="sample-title"
            onClick={() => {
              window.open(sample.url,'_blank');
            }}
          >
              <span
                className="sample-file-name" 
                style={{ fontFamily: getMonospaceFontFamily() }}
              >
                Example : &lt;{sample.fileName}&gt;</span>
              <span
                className="sample-btn"
              >
                <Icon name='github' />
              </span>
              {/* <PopOutButton /> */}
          </Segment>
        </Segment.Group>
        <Segment.Group className="body">
          <Segment className="sample-image">
                <img src={'resources/guides/images/' + sample.image} />
          </Segment>
          <Segment className="code-editor">
            <ViewSelectPanel
                selectedView={selectedView}
                onViewSwitch={
                  (selectedView) => {
                    this.setState({ selectedView });
                  }
                }
            />
            {selectedView === VIEWS.SOURCE &&
              <CodeEditor
                content={sample.content || ''}
                onChange={this.onCurrentSampleContentChange}
                sample={sample}
              />
            }
            {selectedView === VIEWS.COMPOSER &&
              <DesignView
                content={sample.content || ''}
              />
            }
            {selectedView === VIEWS.BINARY &&
              <DownloadsView  />
            }
          </Segment>
          {this.state.curlVisible &&
            <Segment className="curl-editor">
              <CURLEditor
                sample={sample}
              />
            </Segment>
          }
          <Segment className="console" style={{ height: consoleHeight }}>
            <Console
              ref={(consoleRef) => {
                this.consoleRef = consoleRef;
              }}
              curlVisible={this.state.curlVisible}
              onTryItClick={() => {
              }}
            />
          </Segment>
        </Segment.Group>
        <Segment.Group className="footer">
          <Segment className="controls">
              <div className="navigator">
                  <SamplesList samples={samples} onSelect={this.onSampleSelect} />
              </div>
              <div className="other">
                    <RunButton
                      sample={sample}
                      consoleRef={this.consoleRef}
                      disabled={!isReadyToRun}
                    />
                    {/* <ShareButton /> */}
              </div>    
          </Segment>
        </Segment.Group>
        </div>
      }
        {!sample &&
          <p>No samples are available to display.</p>
        }
    </Container>
    
    );
  }
}

export default BallerinaWidget;
