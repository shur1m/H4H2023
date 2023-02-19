import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import IconDisplay from '../IconDisplay';

export default memo(({data, isConnectable, selected}) => {
    let iconName = data.iconName ?? '';
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
                
                { iconName === '' ?
                    <div className='nodeLabel' style={{color: 'black'}}> { data.label } </div>
                :
                    <>
                        <IconDisplay name={iconName}/>
                        <div className='nodeLabel' style= {{ position:'absolute', top: '118px'}}> { data.label } </div>

                    </>
                }
                            </div>

            <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
            />
        </>
    );
});
