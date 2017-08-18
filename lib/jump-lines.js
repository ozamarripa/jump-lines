'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  config: {
    numberLinesJump: {
      type: "integer",
      default: 10,
      minimum: 1
    },
    numberLinesSmallJump: {
      type: "integer",
      default: 5,
      minimum: 1
    }
  },

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:up': () => this.jumpUp(atom.config.get("jump-lines.numberLinesJump"))
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:up-small': () => this.jumpUp(atom.config.get("jump-lines.numberLinesSmallJump"))
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:down': () => this.jumpDown(atom.config.get("jump-lines.numberLinesJump"))
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jump-lines:down-small': () => this.jumpDown(atom.config.get("jump-lines.numberLinesSmallJump"))
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
