import Image from "next/image";

type TweetCardProps = {
    username: string;
    handle: string;
    avatarUrl?: string;
    date: string;
    content: string;
};

export default function TweetCard({
    username,
    handle,
    avatarUrl = `https://ui-avatars.com/api/?name=John+Doe&background=72007f&color=fff&size=128`,
    date,
    content,
}: TweetCardProps) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
                <Image
                    src={avatarUrl}
                    alt={`${username} avatar`}
                    width={40}   // match CSS size
                    height={40}
                    priority
                    className="rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-900 text-lg">{username}</p>
                    <p className="text-sm text-gray-500">@{handle} · {date}</p>
                </div>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">{content}</p>
        </div>
    );
}
