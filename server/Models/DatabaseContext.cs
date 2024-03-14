using Microsoft.EntityFrameworkCore;

namespace AINews.Models;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options)
    : base(options) { }

  public DbSet<AIPost> AIPosts => Set<AIPost>();
  public DbSet<User> Users => Set<User>();

  public DbSet<PostUser> PostUsers => Set<PostUser>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.HasPostgresExtension("uuid-ossp");

    modelBuilder.Entity<AIPost>()
      .Property(e => e.CreatedAt)
      .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

    modelBuilder.Entity<AIPost>()
      .Property(e => e.Id)
      .HasDefaultValueSql("uuid_generate_v4()");

    modelBuilder.Entity<User>()
      .Property(e => e.Id)
      .HasDefaultValueSql("uuid_generate_v4()");

    modelBuilder.Entity<PostUser>()
      .Property(e => e.Id)
      .HasDefaultValueSql("uuid_generate_v4()");

    modelBuilder.Entity<AIPost>()
      .HasOne(e => e.User)
      .WithMany()
      .HasForeignKey(e => e.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<PostUser>()
      .HasOne(e => e.User)
      .WithMany()
      .HasForeignKey(e => e.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<PostUser>()
      .HasOne(e => e.AIPost)
      .WithMany()
      .HasForeignKey(e => e.AIPostId)
      .OnDelete(DeleteBehavior.Cascade);

    // modelBuilder.Entity<AIPost>()
    //   .HasOne(e => e.ParentId)
    //   .WithMany()
    //   .HasForeignKey(e => e.ParentId)
    //   .OnDelete(DeleteBehavior.Cascade);
  }
}
