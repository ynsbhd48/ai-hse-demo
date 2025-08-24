import React from 'react'

function PermitForm() {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Work Permit Form</h2>
      <form className="flex flex-col gap-2">
        <input type="text" placeholder="Work Type" className="border p-2 rounded" />
        <input type="text" placeholder="Zone" className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}

export default PermitForm