TaskTrackerView = require './task-tracker-view'
{CompositeDisposable} = require 'atom'

module.exports = TaskTracker =
  taskTrackerView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @taskTrackerView = new TaskTrackerView(state.taskTrackerViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @taskTrackerView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'task-tracker:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @taskTrackerView.destroy()

  serialize: ->
    taskTrackerViewState: @taskTrackerView.serialize()

  toggle: ->
    console.log 'TaskTracker was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
