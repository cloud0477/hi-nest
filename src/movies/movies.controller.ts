import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    /* 
     * 서비스는 기본적으로 수동으로 import하지 않는다.
     * constructor를 사용
     */
    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll() :Movie[]{
        return this.moviesService.getAll();
    }

    /*
     * /:id보다 밑에있으면 안된다.
     * 그 이유는 search도 ID로 인식한다.
     */
    @Get("search")
    search(@Query("year") searchingYear: string){
        return `We are searching for a movie made a after : ${searchingYear}`;
    }

    @Get(":id")
    getOne(@Param('id') movieId: number): Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete(":id")
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto ){
        return this.moviesService.update(movieId, updateData);
    }

}
