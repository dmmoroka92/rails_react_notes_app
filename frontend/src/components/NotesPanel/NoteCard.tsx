function NoteCard() {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-3 text-xl font-bold">
        Bild Review
      </h3>

      <p className="line-clamp-4 text-sm leading-relaxed text-gray-500">
        I used to be a UX designer without any graphic design skills.
        I loved just designing interfaces, but I soon realized that
        there are a lot of reasons to learn how to do it beautifully too.
      </p>

      <div className="mt-6 flex items-center justify-between text-sm 
        font-medium text-gray-400">
        <span>WED, 26 APR 23</span>
        <span className="text-xl">...</span>
      </div>
    </article>
  )
}

export default NoteCard