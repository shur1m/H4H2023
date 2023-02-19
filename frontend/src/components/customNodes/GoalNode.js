import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({data, isConnectable, selected}) => {
    let nodeClassname = 'goalNode';
    if (selected) nodeClassname += ' selected';
    return (
        <>
            <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            />

            <div className={nodeClassname}>
                { data.label }
            </div>

            <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
            />
        </>
    );
});
