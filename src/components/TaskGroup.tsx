import React from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import cn from 'classnames'

import { GroupOfTasks } from './FakeDataProvider'
import { Droppable } from 'react-beautiful-dnd'
import { TaskList } from './TaskList'

const styles = {
  taskGroup: {
    padding: 15,
    transition: 'background-color 0.2s ease',
  },

  taskGroupDraggingOver: {
    backgroundColor: '#f5f5f5',
  },

  listWrapper: {
    minHeight: 100,
  },

  groupTitle: {
    '&::placeholder': {
      color: 'lightgray',
    },
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #dadada',
    display: 'flex',
    fontSize: 21,
    margin: '0 auto 10px',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
}

type Props = {
  classes: ClassNameMap<keyof typeof styles>
  group: GroupOfTasks
  className?: string
  isDeletable?: boolean
  onChangeGroup: (groupId: string, newValue: GroupOfTasks) => void
  onChangeTask: (groupId: string, taskId: string, newValue: string) => void
  onDeleteGroup: (groupId: string) => void
}

const TaskGroupComponent: React.FC<Props> = props => {
  const { group, className, classes } = props

  const onChangeGroupTitle = (newTitleValue: string) => {
    props.onChangeGroup(group.id, {
      ...group,
      title: newTitleValue,
    })
  }
  return (
    <div>
      <Droppable droppableId={group.id}>
        {(provided, snapshot) => (
          <div
            className={cn(className, classes.taskGroup, {
              [classes.taskGroupDraggingOver]: snapshot.isDraggingOver,
            })}
          >
            <input
              placeholder="Group title"
              className={classes.groupTitle}
              value={group.title}
              onChange={e => onChangeGroupTitle(e.target.value)}
            />
            <TaskList
              _ref={provided.innerRef}
              {...provided.droppableProps}
              group={group}
              onChangeTask={props.onChangeTask}
            />
          </div>
        )}
      </Droppable>

      {props.isDeletable && (
        <button onClick={() => props.onDeleteGroup(props.group.id)}>
          Delete group
        </button>
      )}
    </div>
  )
}

export const TaskGroup = injectSheet(styles)(TaskGroupComponent)
