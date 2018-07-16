/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

import CodePush from 'react-native-code-push';

export default class App extends Component {
  sendEvent = () => {
    Analytics.trackEvent('My Custom Event', {
      prop1: new Date().getSeconds()
    });
  }

  nativeCrash = () => {
    Crashes.generateTestCrash();
  }

  func1 = () => { this.func2(); }
  func2 = () => { this.func3(); }
  func3 = () => { this.func4(); }
  func4 = () => { this.func5(); }

  jsCrash = () => {
    this.func1();
  }

  func5 = () => { throw new Error("My uncaught JS Exception") }

  constructor(props) {
    super(props);
    this.state = { logs: [] };
  }

  codepushSync = () => {
    this.setState({logs: ['Started At ' + new Date().getTime()]})
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE
    }, (status) => {
      for (var key in CodePush.SyncStatus) {
        if (status === CodePush.SyncStatus[key]) {
          this.setState(prevState => ({ logs: [...prevState.logs, key.replace(/_/g, ' ')] }));
          break;
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.codepush}>Added with Code Push</Text>
        <Text style={styles.codepush}>Another text added with code punch</Text>
        <Button title="Send Event" onPress={() => this.sendEvent()} />
        <Button title="Native Crash" onPress={() => this.nativeCrash()} />
        <Button title="JS Crash" onPress={() => this.jsCrash()} />
        <Button title="Code Push" onPress={() => this.codepushSync()} />
        <Text>{JSON.stringify(this.state.logs)}</Text>
        {this.state.logs.map((log, i) => <Text key={i}>{log}</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  codepush: {
    fontSize: 25,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
