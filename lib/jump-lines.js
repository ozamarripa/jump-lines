'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:up': () => this.jumpUp(10)
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:up-small': () => this.jumpUp(5)
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:down': () => this.jumpDown(10)
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:down-small': () => this.jumpDown(5)
    }));

  },

  deactivate() {
    this.subscriptions.dispose();
  },

  jumpUp(noLines) {
    editor = atom.workspace.getActiveTextEditor()
    if (!editor)
      return
    const positionPoint = editor.getCursorScreenPosition()
    const row = (positionPoint.row - noLines) < 0 ? 0 : (positionPoint.row - noLines)
    editor.setCursorScreenPosition([row, positionPoint.column])
  },

  jumpDown(noLines) {
    editor = atom.workspace.getActiveTextEditor()
    if (!editor)
      return
    const positionPoint = editor.getCursorScreenPosition()
    const row = positionPoint.row + noLines
    editor.setCursorScreenPosition([row, positionPoint.column])
  },

};
