import React, { useMemo, useState } from 'react'
import useAppStore from '../store/appStore'

const PermitForm = React.memo(function PermitForm() {
  const { addAlert } = useAppStore()
  const [values, setValues] = useState({ type: '', zone: '', supervisor: '' })
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => {
    const e = {}
    if (!values.type) e.type = 'Required'
    if (!values.zone) e.zone = 'Required'
    if (!values.supervisor) e.supervisor = 'Required'
    return e
  }, [values])

  const valid = Object.keys(errors).length === 0

  const onChange = (e) => setValues((s) => ({ ...s, [e.target.name]: e.target.value }))
  const onBlur = (e) => setTouched((s) => ({ ...s, [e.target.name]: true }))

  const onSubmit = (e) => {
    e.preventDefault()
    setTouched({ type: true, zone: true, supervisor: true })
    if (!valid) return
    addAlert({ type: 'success', riskLevel: 'low', title: 'Permit Submitted', message: `Permit for ${values.type} in ${values.zone} submitted`, timestamp: Date.now(), id: `${Date.now()}` })
    setValues({ type: '', zone: '', supervisor: '' })
  }

  const progress = Math.round(((3 - Object.keys(errors).length) / 3) * 100)

  return (
    <div className="glass-card p-4">
      <h2 className="text-lg font-semibold mb-2">Work Permit</h2>
      <div className="mb-2">
        <progress className="progress progress-primary w-full" value={progress} max="100"></progress>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-3" onSubmit={onSubmit} noValidate>
        <div>
          <label className="label"><span className="label-text">Work Type</span></label>
          <input name="type" value={values.type} onChange={onChange} onBlur={onBlur} type="text" placeholder="Hot work" className={`input input-bordered w-full ${touched.type && errors.type ? 'input-error' : ''}`} />
          {touched.type && errors.type && <span className="text-error text-xs">{errors.type}</span>}
        </div>
        <div>
          <label className="label"><span className="label-text">Zone</span></label>
          <input name="zone" value={values.zone} onChange={onChange} onBlur={onBlur} type="text" placeholder="Tank Farm B" className={`input input-bordered w-full ${touched.zone && errors.zone ? 'input-error' : ''}`} />
          {touched.zone && errors.zone && <span className="text-error text-xs">{errors.zone}</span>}
        </div>
        <div>
          <label className="label"><span className="label-text">Supervisor</span></label>
          <input name="supervisor" value={values.supervisor} onChange={onChange} onBlur={onBlur} type="text" placeholder="Jane Doe" className={`input input-bordered w-full ${touched.supervisor && errors.supervisor ? 'input-error' : ''}`} />
          {touched.supervisor && errors.supervisor && <span className="text-error text-xs">{errors.supervisor}</span>}
        </div>
        <div className="md:col-span-3 flex justify-end">
          <button disabled={!valid} type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  )
})

export default PermitForm