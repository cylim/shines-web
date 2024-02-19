
export const Container = ({ children }: { children: React.ReactNode }) => {

  return (<>
    <main className={
      `flex flex-col justify-start items-center w-[100%] container bg-gray-900 text-white rounded-3xl p-10 overflow-y-scroll`}
      >
      {children}
    </main>

  </>
  )
}