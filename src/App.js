import React from 'react';
import './App.css';
import * as go from 'gojs';
import {ReactDiagram} from 'gojs-react';

function initDiagram() {
  const $ = go.GraphObject.make;
  const diagram = 
      $(go.Diagram, {
        "undoManager.isEnabled": true,
        'clickCreatingTool.archetypeNodeData' : {text: 'new node', color:'lightblue'},
        model: $(go.GraphLinksModel, {
          linkKeyProperty: 'key'
        })
      });

      diagram.nodeTemplate = 
            $(go.Node, 'Auto',
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'RoundedRectangle', 
                 { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                 new go.Binding('fill', 'color')
                ),
                $(go.TextBlock, 
                  {margin: 8, editable: true},
                  new go.Binding('text').makeTwoWay()
                  )
            );
            return diagram;
}

function handleModelChange(changes) {
  alert('GoJS model changed');
}
function App() {
  return (
    <div>
      
      <ReactDiagram 
          initDiagram={initDiagram}
          divClassName="diagram-component"
          nodeDataArray={[
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0'},
            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
            { key: 2, text: 'Gamma', color: 'lightblue', loc: '0 150'},
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
          ]}
          linkDataArray={[
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2},
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
          ]}
          onModelChange={handleModelChange}
      
      />

    </div>
  );
}

export default App;


// import * as go from 'gojs';
// import * as React from 'react';

// import { DiagramWrapper } from './component/Diagram'

// // interface AppState {
// //   // ...
// //   nodeDataArray: Array<go.ObjectData>;
// //   linkDataArray: Array<go.ObjectData>;
// //   modelData: go.ObjectData;
// //   selectedKey: number | null;
// //   skipsDiagramUpdate: boolean;
// // }

// class App extends React.Component<{}, AppState> {
//   constructor(props: object) {
//     super(props);
//     this.state = {
//       // ...
//       nodeDataArray: [
//         { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
//         { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
//         { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
//         { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
//       ],
//       linkDataArray: [
//         { key: -1, from: 0, to: 1 },
//         { key: -2, from: 0, to: 2 },
//         { key: -3, from: 1, to: 1 },
//         { key: -4, from: 2, to: 3 },
//         { key: -5, from: 3, to: 0 }
//       ],
//       modelData: {
//         canRelink: true
//       },
//       selectedKey: null,
//       skipsDiagramUpdate: false
//     };
//     // bind handler methods
//     this.handleDiagramEvent = this.handleDiagramEvent.bind(this);
//     this.handleModelChange = this.handleModelChange.bind(this);
//     this.handleRelinkChange = this.handleRelinkChange.bind(this);
//   }

//   /**
//    * Handle any app-specific DiagramEvents, in this case just selection changes.
//    * On ChangedSelection, find the corresponding data and set the selectedKey state.
//    *
//    * This is not required, and is only needed when handling DiagramEvents from the GoJS diagram.
//    * @param e a GoJS DiagramEvent
//    */
//   handleDiagramEvent(e: go.DiagramEvent) {
//     const name = e.name;
//     switch (name) {
//       case 'ChangedSelection': {
//         const sel = e.subject.first();
//         if (sel) {
//           this.setState({ selectedKey: sel.key });
//         } else {
//           this.setState({ selectedKey: null });
//         }
//         break;
//       }
//       default: break;
//     }
//   }

//   /**
//    * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
//    * This method should iterates over those changes and update state to keep in sync with the GoJS model.
//    * This can be done via setState in React or another preferred state management method.
//    * @param obj a JSON-formatted string
//    */
//   handleModelChange(obj: go.IncrementalData) {
//     const insertedNodeKeys = obj.insertedNodeKeys;
//     const modifiedNodeData = obj.modifiedNodeData;
//     const removedNodeKeys = obj.removedNodeKeys;
//     const insertedLinkKeys = obj.insertedLinkKeys;
//     const modifiedLinkData = obj.modifiedLinkData;
//     const removedLinkKeys = obj.removedLinkKeys;
//     const modifiedModelData = obj.modelData;

//     console.log(obj);

//     // see gojs-react-basic for an example model change handler
//     // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update
//   }

//   /**
//    * Handle changes to the checkbox on whether to allow relinking.
//    * @param e a change event from the checkbox
//    */
//   handleRelinkChange(e: any) {
//     const target = e.target;
//     const value = target.checked;
//     this.setState({ modelData: { canRelink: value }, skipsDiagramUpdate: false });
//   }

//   render() {
//     let selKey;
//     if (this.state.selectedKey !== null) {
//       selKey = <p>Selected key: {this.state.selectedKey}</p>;
//     }

//     return (
//       <div>
//         <DiagramWrapper
//           nodeDataArray={this.state.nodeDataArray}
//           linkDataArray={this.state.linkDataArray}
//           modelData={this.state.modelData}
//           skipsDiagramUpdate={this.state.skipsDiagramUpdate}
//           onDiagramEvent={this.handleDiagramEvent}
//           onModelChange={this.handleModelChange}
//         />
//         <label>
//           Allow Relinking?
//           <input
//             type='checkbox'
//             id='relink'
//             checked={this.state.modelData.canRelink}
//             onChange={this.handleRelinkChange} />
//         </label>
//         {selKey}
//       </div>
//     );
//   }
// }
// export default App;