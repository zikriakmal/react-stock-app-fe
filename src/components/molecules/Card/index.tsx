const Card = ({ color, title, value }: { icon: React.ReactNode; color: string; title: string; value: number }) => (
    <div className="shadow-md w-52 hover:scale-110 hover:cursor-pointer transition bg-white items-center justify-center p-10 text-center gap-3 flex-col flex rounded-sm">
        <p className={`font-sans text-xs ${color}`}>{title}</p>
        <p className="font-semibold text-xl">{value}</p>
    </div>
);

export default Card;
