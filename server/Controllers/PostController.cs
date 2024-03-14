using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AINews.Models;
using Microsoft.AspNetCore.SignalR;
using AINews.Hubs;
using System.Text;
using Newtonsoft.Json;

namespace AINews.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AIPostsController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly IHubContext<PostHub> _hubContext;

    public AIPostsController(DatabaseContext context, IHubContext<PostHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AIPost>>> GetPostItems()
    {
        var AIPostItems = await _context
            .AIPosts
            .Include(x => x.User)
            .ToListAsync();

        return AIPostItems;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AIPost>> GetPostItem(string id)
    {
        var AIPostItem = await _context.AIPosts.FindAsync(id);

        if (AIPostItem == null)
        {
            return NotFound();
        }

        return AIPostItem;
    }

    [HttpPost]
    public async Task<ActionResult<AIPost>> PostPostItem(AIPost AIPost)
    {
        AIPost.Id = Guid.NewGuid().ToString();

        // find the user by the user id and set the user property 
        var users = await _context
            .Users
            .Where(x => x.userId == AIPost.UserId)
            .ToListAsync();

        if (users.Count == 0)
        {
            return BadRequest();
        }

        AIPost.User = users[0]; AIPost.UserId = users[0].Id;

        _context.AIPosts.Add(AIPost);

        await _context.SaveChangesAsync();

        await _hubContext.Clients.All.SendAsync("newpost", AIPost);
        return CreatedAtAction(nameof(GetPostItems), new { id = AIPost.Id }, AIPost);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPostItem(string id, AIPost AIPost)
    {
        if (id != AIPost.Id)
        {
            return BadRequest();
        }

        _context.Entry(AIPost).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        await _hubContext
            .Clients
            .All
            .SendAsync("updatepost", AIPost);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePostItem(string id)
    {
        var PostItem = await _context
            .AIPosts
            .FindAsync(id);

        if (PostItem == null)
        {
            return NotFound();
        }

        try
        {
            _context.AIPosts.Remove(PostItem);
            await _context.SaveChangesAsync();
            await _hubContext
                .Clients
                .All
                .SendAsync("deletepost", id);
        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }

        return NoContent();
    }

    [HttpPost("vote")]
    public async Task<ActionResult<PostUser>> UpDownVotePost(UserPostRequest request)
    {

        var postUserItems = await _context.PostUsers
            .Where(x => x.AIPostId == request.PostId && x.UserId == request.UserId)
            .ToListAsync();

        if (postUserItems.Count == 0)
        {
            var postUser = new PostUser
            {
                Id = Guid.NewGuid().ToString(),
                AIPostId = request.PostId,
                UserId = request.UserId,
                Value = PostUserValue.LIKE
            };
            _context.PostUsers.Add(postUser);
            await _context.SaveChangesAsync();
        }
        else
        {
            var postUser = postUserItems[0];
            postUser.Value = postUser.Value == PostUserValue.LIKE ? PostUserValue.NEUTRAL : PostUserValue.LIKE;
            await _context.SaveChangesAsync();
        }

        return Ok();

    }

    [HttpPost("getlikes/{postId}")]
    public async Task<ActionResult<int>> GetLikes(string postId)
    {
        var postUserItems = await _context.PostUsers
            .Where(x => x.AIPostId == postId && x.Value == PostUserValue.LIKE)
            .ToListAsync();

        return postUserItems.Count;
    }


    [HttpPost("completepost")]
    public async Task<ActionResult<string>> Chat(ChatRequest request)
    {
        var httpClient = new HttpClient();

        httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
        var requestBody = new StringContent(JsonConvert.SerializeObject(new
        {
            model = "gpt-3.5-turbo-instruct",
            prompt = request.Prompt,
            max_tokens = request.MaxTokens,
            temperature = request.Temperature
        }), Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync(Environment.GetEnvironmentVariable("OPENAI_API_ENDPOINT"), requestBody);

        var responseBody = await response.Content.ReadAsStringAsync();

        return Ok(responseBody);
    }

}

public class UserPostRequest
{
    public string UserId { get; set; } = "";
    public string PostId { get; set; } = "";
}


public class ChatRequest
{
    public string Prompt { get; set; } = "";
    public int MaxTokens { get; set; }
    public double Temperature { get; set; }
}
