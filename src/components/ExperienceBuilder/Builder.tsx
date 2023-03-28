import { useState, useCallback, useMemo, ChangeEvent } from 'react'
import { ExperienceDisplay, Experience, ComponentMap } from './Display'
import { Button, ErrorBoundary, Modal } from '../Utils'
import { Select } from '../Inputs'
import { Paper } from '../Utils'

import styles from './Builder.module.scss'
import useConvertToSchemaHook from './useConvertToSchemaHook'
import { DynamicForm } from '../DynamicForm'

export interface InputShape<T> {
  type: 'string' | 'number' | 'boolean' | 'array'
  required?: boolean
  shape?: T
}

export const ExperienceBuilder = ({ initialExperience = [] }: { initialExperience?: Experience[]}) => {
  const convertToSchema = useConvertToSchemaHook()
  const [ newElementIsOpen, setNewElementIsOpen ] = useState(false)
  const [ componentToAdd, setComponentToAdd ] = useState<Experience | undefined>()
  const [ experience, setExperience ] = useState<Experience[]>(initialExperience)

  const addElement = useCallback((component: Experience) => {
    setExperience(state => [...state, component])
  }, [])

  const setExperienceValue = useCallback((index: number, value: Record<string, unknown>) => {
    setExperience(state => {
      state[index] = { ...state[index], props: value }
      return [...state] // force a re-render
    })
  }, [])

  const handleNewElementChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const component = e.target.value as Experience["component"]
    
    const exp: Experience = {
      component: component,
      props: {}
    }

    Object.entries(ComponentMap[component].availableFields).forEach(([key, value]) => {
      switch (value.type) {
        case 'string':
          exp.props[key] = ''
          break;
        case 'number':
          exp.props[key] = 0
          break;
        case 'boolean':
          exp.props[key] = false
          break;
        case 'array': 
          exp.props[key] = []
          break;
        default:
          exp.props[key] = {}
      }
    })

    setComponentToAdd(exp)
  }, [])
    
  const handleElementDeletion = useCallback((index: number) => {
    setExperience(state => {
      state.splice(index, 1)
      return [...state]
    })
  }, [])

  const forms = useMemo(() => {
    return experience.map((component, index) => {
      return convertToSchema(component)
    })
  }, [experience, convertToSchema])


  return <div className={styles.container}>
    <div className={styles.editor}>
      <ErrorBoundary>
        <>
          {
            forms.map((form, index) => <Paper className={styles.formContainer} key={index} elevation={4}>
              <>
                <div className={styles.formHeader}>
                  <h2>{form.componentName}</h2>
                  <Button variant="outlined" onClick={() => handleElementDeletion(index)}>Remove</Button>
                </div>
                <DynamicForm
                  entity={form}
                  onSubmit={value => setExperienceValue(index, value)}
                />
              </>
            </Paper>
            )
          }
          <Button
            className={styles.addElementButton}
            onClick={() => {setNewElementIsOpen(true)}}
          >
            Add Element
          </Button>
        </>
      </ErrorBoundary>

      <Modal
        isOpen={newElementIsOpen}
        onRequestClose={() => setNewElementIsOpen(false)}
      >
        <>
          <h1>Add Element</h1>

          <Select
            name="component"
            label="Component"
            options={Object.keys(ComponentMap).map(key => ({ _id: key, label: key }))}
            value={componentToAdd?.component || ''}
            onChange={handleNewElementChange}
            nullable
          />
          
          <Button onClick={() => {
            if (componentToAdd) {
              addElement(componentToAdd)
            }
            setNewElementIsOpen(false)
          }}>
            Add
          </Button>
        </>
      </Modal>
    </div>
    <ErrorBoundary>
      <div className={styles.display}>
        <h2 className={styles.previewHeader}>Preview</h2>
        <ExperienceDisplay experience={experience} />
      </div>
    </ErrorBoundary>
  </div>
}

export default ExperienceBuilder