import { Gorse, GorseException } from "../src";
import { createClient } from "redis";
const client = new Gorse({
    endpoint: "http://127.0.0.1:8088",
    secret: "gorse",
});
const redisClient = createClient({
    url: "redis://127.0.0.1:6379",
});
redisClient.on("error", (err) => {
    console.log("Error " + err);
});
beforeAll(async () => {
    await redisClient.connect();
});
afterAll(async () => {
    await redisClient.disconnect();
});
test("test users", async () => {
    let rowAffected = await client.insertUser({
        UserId: "100",
        Labels: ["a", "b", "c"],
        Comment: "comment",
    });
    expect(rowAffected).toBe(1);
    const user = await client.getUser("100");
    expect(user).toStrictEqual({
        UserId: "100",
        Labels: ["a", "b", "c"],
        Subscribe: null,
        Comment: "comment",
    });
    rowAffected = await client.deleteUser("100");
    expect(rowAffected).toBe(1);
    await expect(client.getUser("100")).rejects.toThrow(GorseException);
});
test("test items", async () => {
    const timestamp = "2022-08-07T00:26:46Z";
    let rowAffected = await client.upsertItem({
        ItemId: "100",
        IsHidden: true,
        Labels: ["a", "b", "c"],
        Categories: ["d", "e"],
        Timestamp: timestamp,
        Comment: "comment",
    });
    expect(rowAffected).toBe(1);
    const item = await client.getItem("100");
    expect(item).toStrictEqual({
        ItemId: "100",
        IsHidden: true,
        Labels: ["a", "b", "c"],
        Categories: ["d", "e"],
        Timestamp: timestamp,
        Comment: "comment",
    });
    rowAffected = await client.deleteItem("100");
    expect(rowAffected).toBe(1);
    await expect(client.getItem("100")).rejects.toThrow(GorseException);
});
test("test feedback", async () => {
    const timestamp = "2022-08-07T00:26:46Z";
    const rowAffected = await client.insertFeedbacks([
        {
            FeedbackType: "like",
            UserId: "100",
            ItemId: "100",
            Timestamp: timestamp,
        },
        {
            FeedbackType: "read",
            UserId: "100",
            ItemId: "200",
            Timestamp: timestamp,
        },
        {
            FeedbackType: "read",
            UserId: "100",
            ItemId: "300",
            Timestamp: timestamp,
        },
    ]);
    expect(rowAffected).toBe(3);
});
test("test recommend", async () => {
    await redisClient.zAdd("offline_recommend/100", { score: 1, value: "1" });
    await redisClient.zAdd("offline_recommend/100", { score: 2, value: "2" });
    await redisClient.zAdd("offline_recommend/100", { score: 3, value: "3" });
    const recommendedItems = await client.getRecommend({
        userId: "100",
    });
    expect(recommendedItems).toStrictEqual(["3", "2", "1"]);
});
