
const friendRecommend = (user) => {
    const { followings } = user;

    // lấy ra danh sách id của người followings
    var followingId = followings.map(item => item._id);
    followingId.push(user._id);

    // lấy toàn bộ followings của followings bỏ vào rawArrFriend
    var rawArrFriend = [];
    for (const f of followings) {
        rawArrFriend = [...rawArrFriend, ...f.followings.map(item => item._id)]
    }

    // lọc ra những người mà mình đã follow
    rawArrFriend = rawArrFriend.filter(item => !followingId.includes(item));

    // xây dựng một map: key => count
    var counts = rawArrFriend.reduce(function (map, id) {
        map[id] = (map[id] || 0) + 1;
        return map;
    }, {});

    // Sắp xếp mảng theo key
    var sorted = Object.keys(counts).sort(function (a, b) {
        return counts[b] - counts[a];
    });

    // lấy ra top 5
    var top5 = sorted.slice(0, 5);

    // gọi api để lấy 5 người có số lần xuất hiện nhiều nhất
    console.log(top5);

}

export default friendRecommend;