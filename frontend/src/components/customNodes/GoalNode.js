import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({data, isConnectable, selected}) => {
    let nodeClassname = 'goalNode';
    if (selected) nodeClassname += ' selectedNode';
    return (
        <>
            <Handle
            type="target"
            position={Position.Bottom}
            isConnectable={isConnectable}
            />

            <div className={nodeClassname} onClick={() => console.log(selected)}>
                { data.label }
            </div>

            <Handle
            type="source"
            position={Position.Top}
            isConnectable={isConnectable}
            />
        </>
    );
});
