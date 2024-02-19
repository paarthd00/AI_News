using Microsoft.AspNetCore.SignalR;
using AINews.Models;

namespace AINews.Hubs;
public class PostHub : Hub
{
    public async Task BroadcastPost(Post newPost)
    {
        await Clients.All.SendAsync("newPost", newPost);
    }
}
