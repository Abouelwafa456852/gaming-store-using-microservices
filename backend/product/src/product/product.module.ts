/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), // Provide ProductModel
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
