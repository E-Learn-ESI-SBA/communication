import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping, types } from 'cassandra-driver';
import { Post } from './entities/post.entity';
import { CassandraService } from 'src/cassandra/cassandra.service';

@Injectable()
export class PostRepo implements OnModuleInit {

    constructor(private cassandraService: CassandraService) { }

    postMapper: mapping.ModelMapper<Post>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'Post': {
                    tables: ['posts'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.postMapper = this.cassandraService.createMapper(mappingOptions).forModel('Post');
    }

    async getPosts() {
        return (await this.postMapper.findAll()).toArray();
    }

    async getPostById(id: types.Uuid) {
        return (await this.postMapper.find({ id: id })).first();
    }

    async createPost(post: Post) {
        // return (await this.postMapper.insert(post)).toArray();
        return (await this.postMapper.insert(post, { fields: ['id', 'text', 'user_id', 'createdat', 'updatedat'], ifNotExists: true})).wasApplied();
    }

    async updatePostText(id: string, text: string) {
        const employee = new Post();
        employee.id  = id;
        employee.text = text;
        return (await this.postMapper.update(employee, { fields: ['id', 'text'], ifExists: true})).toArray();
    }
}