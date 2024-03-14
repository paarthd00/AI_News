# Use the official .NET SDK image with Alpine
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Restore dependencies
RUN dotnet restore

# Build the application
RUN dotnet build -c Release


# Expose port 8000
EXPOSE 8000

# Run the application using dotnet watch
CMD ["dotnet", "watch", "run", "--urls", "http://127.0.0.1:8000"]

