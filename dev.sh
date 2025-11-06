#!/bin/bash

# Development script untuk memudahkan development
echo "🚀 Angular Docker Development Helper"
echo "=================================="

case "$1" in
  "start")
    echo "🔄 Starting development environment..."
    docker-compose up
    ;;
  "stop")
    echo "⏹️  Stopping development environment..."
    docker-compose down
    ;;
  "restart")
    echo "🔄 Restarting development environment..."
    docker-compose down
    docker-compose up
    ;;
  "logs")
    echo "📋 Showing application logs..."
    docker-compose logs -f angular-app
    ;;
  "build")
    echo "🏗️  Building production..."
    docker-compose -f docker-compose.prod.yml up --build
    ;;
  "clean")
    echo "🧹 Cleaning up containers and volumes..."
    docker-compose down -v --rmi all
    docker system prune -f
    ;;
  "shell")
    echo "🐚 Opening shell in development container..."
    docker-compose exec angular-app sh
    ;;
  "install")
    echo "📦 Installing npm packages..."
    docker-compose exec angular-app npm install
    ;;
  "test")
    echo "🧪 Running tests..."
    docker-compose exec angular-app npm run test
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|logs|build|clean|shell|install|test}"
    echo ""
    echo "Commands:"
    echo "  start    - Start development environment"
    echo "  stop     - Stop development environment" 
    echo "  restart  - Restart development environment"
    echo "  logs     - Show application logs"
    echo "  build    - Build production"
    echo "  clean    - Clean containers and images"
    echo "  shell    - Open shell in container"
    echo "  install  - Install npm packages"
    echo "  test     - Run tests"
    exit 1
esac