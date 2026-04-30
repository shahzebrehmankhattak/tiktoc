
const Header = () => {
  return (
     <nav className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-2 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-2xl tracking-tight text-gray-900">ticktock</span>
          <span className="text-sm text-gray-400">Timesheets</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          John Doe <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
        </div>
      </nav>

  )
}

export default Header